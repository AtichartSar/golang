package main

import (
	"loan-service/config"
	"loan-service/routes"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.InitDB()
	defer config.CloseDB()

	// migrations.Migrate()
	r := gin.Default()
	routes.Serve(r)

	r.Run(":" + os.Getenv("PORT"))
}
