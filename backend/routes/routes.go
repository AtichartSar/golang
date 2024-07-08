package routes

import (
	"loan-service/config"
	"loan-service/controllers"
	"loan-service/middleware"

	"github.com/gin-gonic/gin"
)

func Serve(r *gin.Engine) {
	db := config.DB

	r.GET("", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Welcome to Loan Service",
		})
	})
	authMiddleware := middleware.JWT()

	customerGroup := r.Group("/api/v1/customers")
	customerController := controllers.Customers{
		DB: db,
	}
	{
		customerGroup.GET("", customerController.FindAll)
		customerGroup.GET("/:id", customerController.FindOne)
		customerGroup.POST("", customerController.Create)
		customerGroup.POST("login", customerController.Login)
		customerGroup.PATCH("/:id", customerController.Update)
		customerGroup.DELETE("/:id", customerController.Delete)
	}

	loanGroup := r.Group("/api/v1/loans")
	loanGroup.Use(authMiddleware)
	loanController := controllers.Loans{
		DB: db,
	}
	{
		loanGroup.GET("/:id", loanController.FindOne)
		loanGroup.GET("", loanController.FindAll)
		loanGroup.POST("", loanController.Create)
		loanGroup.PATCH("/:id", loanController.Update)
		loanGroup.DELETE("/:id", loanController.Delete)
	}
	paymentGroup := r.Group("/api/v1/payments")
	paymentGroup.Use(authMiddleware)
	paymentController := controllers.Payment{
		DB: db,
	}
	{
		paymentGroup.GET("", paymentController.FindAll)
		paymentGroup.GET("/:id", paymentController.FindOne)
		paymentGroup.POST("", paymentController.Create)
		paymentGroup.PATCH("/:id", paymentController.Update)
	}

}
