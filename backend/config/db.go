package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
}

func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     3306,
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		DBName:   os.Getenv("DB_NAME"),
	}
	return &dbConfig
}

func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}

func InitDB() {
	var err error
	DB, err = gorm.Open(mysql.Open(DbURL(BuildDBConfig())), &gorm.Config{})

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)

	} else {
		log.Println("Successfully connected to the database")
	}
}

func GetDB() *gorm.DB {
	return DB
}

func CloseDB() {
	dbInstance, _ := DB.DB()
	dbInstance.Close()
}
