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
import { getRandomElementsFromArray } from 'src/util/util';
import { WorkoutPlan } from 'src/entities/workout-plan.entity';
import { WorkoutDetail } from 'src/entities/workout-detail.entity';

export async function seedData(dataSource: DataSource): Promise<void> {
  await dataSource.transaction(async (manager) => {
    //REPOSITORIES
    const userRepo = manager.getRepository(User);
    const muscleGroupRepo = manager.getRepository(MuscleGroup);
    const exerciseTypeRepo = manager.getRepository(ExerciseType);
    const exerciseRepo = manager.getRepository(Exercise);
    const workOutPlanRepo = manager.getRepository(WorkoutPlan);
    const workoutDetailRepo = manager.getRepository(WorkoutDetail);

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
      {
        name: 'Deadlift',
        description:
          'The deadlift is a compound exercise that targets the entire upper body.',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Deadlift_1.jpg/800px-Deadlift_1.jpg',
        tutorialUrl: 'https://en.wikipedia.org/wiki/Deadlift',
      },
    ];

    const createWorOutPlan = [
      { name: 'Workout Plan Test 1', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
      { name: 'Workout Plan Test 2', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    ];

    let exercisesTypes: ExerciseType[] = [];
    let muscleGroups: MuscleGroup[] = [];
    let exercisesList: Exercise[] = [];
    let workoutPlanList: WorkoutPlan[] = [];

    //SEED DATA
    for (const exerciseType of exerciseTypes) {
      exercisesTypes.push(await exerciseTypeRepo.save(exerciseType));
    }
    for (const muscleGroup of muscleGroupData) {
      muscleGroups.push(await muscleGroupRepo.save(muscleGroup));
    }
    for (const exercise of exercises) {
      let tempEx = getRandomElementsFromArray(exercisesTypes, 1);
      let tempMus = getRandomElementsFromArray(muscleGroups, 2);
      exercisesList.push(
        await exerciseRepo.save({
          ...exercise,
          exerciseTypes: tempEx,
          muscleGroups: tempMus,
        }),
      );
    }

    for (const workoutPlan of createWorOutPlan) {
      workoutPlanList.push(await workOutPlanRepo.save(workoutPlan));
    }

    const workoutDetail = [
      {
        week: 0,
        day: 1,
        exercise: exercisesList[0],
        workoutPlan: workoutPlanList[0],
      },
      {
        week: 0,
        day: 2,
        exercise: exercisesList[1],
        workoutPlan: workoutPlanList[1],
      },
    ];

    for (const detail of workoutDetail) {
      await workoutDetailRepo.save(detail);
    }

    for (const user of usersData) {
      await userRepo.save(user);
    }
  });
}
