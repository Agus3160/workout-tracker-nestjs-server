import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { UserRolesEnum } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';
import { CreateMuscleGroupDto } from 'src/muscle-group/muscle-group.dto';
import { MuscleGroup } from 'src/entities/muscle-group.entity';
import { CreateExerciseTypeDto } from 'src/exercise-type/exercise-type.dto';
import { ExerciseType } from 'src/entities/exercise-type.entity';
import { CreateExerciseDto } from 'src/exercise/exercise.dto';
import { Exercise } from 'src/entities/exercise.entity';

export async function seedData(dataSource: DataSource): Promise<void> {
  //REPOSITORIES
  const userRepo = dataSource.getRepository(User);
  const muscleGroupRepo = dataSource.getRepository(MuscleGroup);
  const exerciseTypeRepo = dataSource.getRepository(ExerciseType);
  const exerciseRepo = dataSource.getRepository(Exercise);

  //DATA
  const usersData: CreateUserDto[] = [
    {
      username: 'admin',
      email: 'admin@localhost.com',
      password: await bcrypt.hash('12345678', 10),
      role: UserRolesEnum.ADMIN,
    },
    {
      username: 'user',
      email: 'user@localhost.com',
      password: await bcrypt.hash('12345678', 10),
      role: UserRolesEnum.USER,
    },
  ];

  const muscleGroupData: CreateMuscleGroupDto[] = [
    {
      name: 'Chest',
      description:
        'The chest muscle group includes the pectoral muscles, which are responsible for movements such as pushing and flexing the arms. Exercises like bench presses and push-ups are ideal for developing strength and muscle mass in this area.',
    },
    {
      name: 'Back',
      description:
        'The back muscle group consists of several muscles, including the latissimus dorsi and trapezius, which are crucial for posture and stability. Exercises such as pull-ups and rowing help strengthen and tone this area.',
    },
    {
      name: 'Legs',
      description:
        'The leg muscle group includes the quadriceps, hamstrings, glutes, and calves. These muscles are essential for activities like walking, running, and jumping. Exercises like squats and lunges are effective for building strength and endurance in the legs.',
    },
    {
      name: 'Shoulders',
      description:
        'The shoulder muscle group is composed of the deltoids and rotator cuff, allowing a wide range of movements in the upper body. Exercises like military presses and lateral raises help strengthen and define the shoulders.',
    },
    {
      name: 'Arms',
      description:
        'The arm muscle group includes the biceps and triceps, responsible for flexing and extending the elbow. Exercises such as bicep curls and tricep extensions are essential for increasing the strength and size of the arm muscles.',
    },
    {
      name: 'Core',
      description:
        'The core comprises the muscles of the abdomen, lower back, and obliques. These muscles are crucial for stability, balance, and overall body strength. Exercises like planks and crunches are effective for developing a strong and resilient core.',
    },
  ];

  const exerciseTypes: CreateExerciseTypeDto[] = [
    {
      name: 'Cardio',
      description:
        'Exercises that increase your heart rate and improve cardiovascular endurance, such as running, cycling, and swimming.',
    },
    {
      name: 'Strength',
      description:
        'Exercises focused on building muscle strength and endurance, typically involving resistance training, like weightlifting or bodyweight exercises.',
    },
    {
      name: 'Flexibility',
      description:
        'Exercises that enhance the range of motion of muscles and joints, including stretching routines and yoga practices.',
    },
    {
      name: 'Balance',
      description:
        'Exercises that improve stability and coordination, such as tai chi, balance drills, and stability ball workouts.',
    },
    {
      name: 'Endurance',
      description:
        'Exercises designed to increase stamina and the ability to sustain prolonged physical activity, often overlapping with cardio exercises.',
    },
  ];

  const exercises: CreateExerciseDto[] = [
    {
      name: 'Bench Press',
      description:
        'The bench press is a compound exercise that targets the chest, arms, and back.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bench_press_1.jpg/800px-Bench_press_1.jpg',
      tutorialUrl: 'https://en.wikipedia.org/wiki/Bench_press',
    },
  ];

  let exercisesTypes: ExerciseType[] = [];
  let muscleGroups: MuscleGroup[] = [];

  //SEED DATA
  for (const exerciseType of exerciseTypes) {
    exercisesTypes.push(await exerciseTypeRepo.save(exerciseType));
  }
  for (const muscleGroup of muscleGroupData) {
    muscleGroups.push(await muscleGroupRepo.save(muscleGroup));
  }

  for (const exercise of exercises) {
    await exerciseRepo.save({
      ...exercise,
      exerciseTypes: [exercisesTypes[1]],
      muscleGroups: [muscleGroups[0], muscleGroups[3], muscleGroups[4]],
    });
  }
  for (const user of usersData) {
    await userRepo.save(user);
  }
}
