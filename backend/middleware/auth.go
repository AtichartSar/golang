package middleware

import (
	ptoken "loan-service/utils/token"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func JWT() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.GetHeader("Authorization")
		log.Printf("token: %v", token)
		if token == "" {
			ctx.JSON(http.StatusUnauthorized, "Invalid Token")
			ctx.Abort()
			return
		}

		payload, err := ptoken.ValidateToken(token)
		log.Printf("payload: %v", payload["id"])
		if err != nil || payload == nil {
			ctx.JSON(http.StatusUnauthorized, "Invalid Token")
			ctx.Abort()
			return
		}
		ctx.Set("customerId", payload["id"])
		ctx.Next()
	}
}
