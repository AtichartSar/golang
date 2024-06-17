package migrations

import (
	"loan-service/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1718545618AddCustomerIdToLoan() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1718545618",
		Migrate: func(tx *gorm.DB) error {
			return tx.Migrator().AutoMigrate(&models.Loan{})
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("loans")
		},
	}

}