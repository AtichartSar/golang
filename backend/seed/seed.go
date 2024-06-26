package seed

import (
	"loan-service/config"
	"loan-service/models"
	"log"
)

func DropTable(){
	db := config.DB
	db.Exec("DROP TABLE migrations")
	db.Migrator().DropTable(&models.Customer{}, &models.Loan{}, &models.Payment{})

}

func Load() {
	db := config.DB
	var customers []models.Customer

	customer :=models.Customer{
		Name: "Admin admin",
		Address: "1234 Admin Street",
		District: "Admin District",
		Postcode: "12345",
		Phone: "1234567890",
		Email: "admin@admin.com",
		Password: "admin",
		Role :"admin",
	}

	customers = append(customers, customer)
	if err:=db.CreateInBatches(&customers,5).Error;err!=nil{
				log.Println("Seed failed: %v", err)
	}
	log.Println("Seed did run successfully")
}