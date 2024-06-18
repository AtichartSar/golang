package migrations

import (
	"loan-service/models"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func m1718532375CreateLoanTable() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "1718532375",
		Migrate: func(tx *gorm.DB) error {
			return tx.Migrator().CreateTable(&models.Loan{})
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Migrator().DropTable("loans")
		},
	}

}