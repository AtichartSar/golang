package migrations

import (
	"loan-service/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1718438295CreateCustomerTable() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1718438295",
		Migrate: func(tx *gorm.DB) error {
			return tx.Migrator().CreateTable(&models.Customer{})

		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("customers")
		},
	}
}
