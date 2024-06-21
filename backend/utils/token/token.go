package ptoken

import (
	"log"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jinzhu/copier"
)

const (
	AccessTokenExpiredTime = 5 * 60 * 60 // 5 hours
	TokenSecret            = "secret"
)

func GenerateAccessToken(payload map[string]interface{}) string {
	tokenContent := jwt.MapClaims{
		"payload": payload,
		"exp":     time.Now().Add(time.Second * AccessTokenExpiredTime).Unix(),
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, tokenContent)

	token, err := jwtToken.SignedString([]byte(TokenSecret))
	if err != nil {
		log.Printf("Failed to sign token: %v", err)
		return ""
	}
	return token
}

func ValidateToken(jwtToken string) (map[string]interface{}, error) {
	tokenClean := strings.Replace(jwtToken, "Bearer ", "", -1)
	// token, err := jwt.Parse(tokenClean, func(token *jwt.Token) (interface{}, error) {
	// 	return TokenSecret, nil
	// })
	tokenData := jwt.MapClaims{}
	claims, err := jwt.ParseWithClaims(tokenClean, tokenData, func(token *jwt.Token) (interface{}, error) {
		return []byte(TokenSecret), nil
	})
	log.Printf("tokenData: %v", tokenData)
	log.Printf("err: %v", err)
	if err != nil || !claims.Valid {
		return nil, err
	}

	var data map[string]interface{}

	copier.Copy(&data, tokenData["payload"])
	log.Printf("data: %v", data)
	// log.Panicf("token: %v", token)
	return data, nil

	//     token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
	//       return secretKey, nil
	//    })

	//    if err != nil {
	//       return err
	//    }

	//    if !token.Valid {
	//       return fmt.Errorf("invalid token")
	//    }

	//    return nil
}
