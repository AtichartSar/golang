package migrations

import (
	"loan-service/config"
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
)

func Migrate() {
	db := config.GetDB()
	m := gormigrate.New(db, gormigrate.DefaultOptions, []*gormigrate.Migration{
		m1718438295CreateCustomerTable(),
		m1718532375CreateLoanTable(),
		m1718545618AddCustomerIdToLoan(),
		m1718634114CreatePaymentTable()})

	if err := m.Migrate(); err != nil {
		log.Fatalf("Migration failed: %v", err)
	}
	log.Println("Migration did run successfully")
}
