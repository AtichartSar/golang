package migrations

import (
	"loan-service/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1718634114CreatePaymentTable() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1718634114",
		Migrate: func(tx *gorm.DB) error {
			return tx.Migrator().AutoMigrate(&models.Payment{})

		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable(&models.Payment{})
		},
	}
}
