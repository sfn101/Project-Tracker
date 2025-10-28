import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import connectDB from "../src/databases/connect-mongo.js";
import User from "../src/modules/auth/model/index.js";
import Project from "../src/modules/project/model/index.js";
import Task from "../src/modules/task/model/index.js";

dotenv.config();

const SALT_ROUNDS = 10;

const fakeUsers = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
    status: "active",
  },
  {
    name: "John Doe",
    email: "john@test.com",
    password: "password123",
    role: "member",
    status: "active",
  },
  {
    name: "Jane Smith",
    email: "jane@test.com",
    password: "password123",
    role: "member",
    status: "active",
  },
];

const fakeProjects = [
  {
    name: "E-commerce Website",
    description: "Building an online store with React and Node.js",
    status: "in_progress",
  },
  {
    name: "Mobile App Development",
    description: "Developing a cross-platform mobile application",
    status: "pending",
  },
  {
    name: "Data Analytics Dashboard",
    description: "Creating a dashboard for business intelligence",
    status: "completed",
  },
];

const fakeTasks = [
  {
    name: "Setup development environment",
    status: "completed",
  },
  {
    name: "Design database schema",
    status: "in_progress",
  },
  {
    name: "Implement user authentication",
    status: "pending",
  },
  {
    name: "Create API endpoints",
    status: "pending",
  },
  {
    name: "Build frontend components",
    status: "pending",
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    console.log("🧹 Cleared existing data");

    // Create users
    const hashedUsers = await Promise.all(
      fakeUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, SALT_ROUNDS),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`👥 Created ${createdUsers.length} users`);

    // Create projects for each user
    const projectsWithUsers = [];
    for (const user of createdUsers) {
      const userProjects = fakeProjects.map((project) => ({
        ...project,
        userId: user._id,
      }));
      projectsWithUsers.push(...userProjects);
    }

    const createdProjects = await Project.insertMany(projectsWithUsers);
    console.log(`📁 Created ${createdProjects.length} projects`);

    // Create tasks for each project
    const tasksWithProjects = [];
    for (const project of createdProjects) {
      const projectTasks = fakeTasks.map((task) => ({
        ...task,
        projectId: project._id,
      }));
      tasksWithProjects.push(...projectTasks);
    }

    const createdTasks = await Task.insertMany(tasksWithProjects);
    console.log(`✅ Created ${createdTasks.length} tasks`);

    console.log("🎉 Database seeded successfully!");
    console.log("\n📋 Sample Data:");
    console.log("Admin: admin@test.com / admin123");
    console.log("User: john@test.com / password123");
    console.log("User: jane@test.com / password123");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

seedDatabase();