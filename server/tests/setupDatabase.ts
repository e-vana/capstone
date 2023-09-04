import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const runSeedSql = async function () {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    // Read the SQL file
    const sqlFileContent = fs.readFileSync("./database/seed.sql", "utf8");
    // Split the file content into individual SQL statements
    const sqlStatements = sqlFileContent.split(";");

    // Remove empty statements
    const filteredSqlStatements = sqlStatements.filter(
      (statement: any) => statement.trim() !== ""
    );

    // Execute each SQL statement
    for (const statement of filteredSqlStatements) {
      await connection.query(statement);
    }
  } catch (error) {
    console.log(error);
  }
};
