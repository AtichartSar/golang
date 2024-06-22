package repository

import (
	"context"
	"loan-service/models"
)

type CustomerRepository interface {
	FindAll(ctx context.Context, customer *models.Customer) error
}
