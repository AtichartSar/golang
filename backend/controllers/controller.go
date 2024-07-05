package controllers

import (
	"loan-service/models"
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type pagination struct {
	ctx     *gin.Context
	query   *gorm.DB
	records interface{}
}

func (p *pagination) paginate() *models.PagingResult {
var count int64
	page, _ := strconv.Atoi(p.ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(p.ctx.DefaultQuery("limit", "10"))
	order := p.ctx.DefaultQuery("order", "asc")
    p.query.Model(p.records).Count(&count)

	offset := (page - 1) * limit
	p.query.Order("id " + order).Limit(limit).Offset(offset).Find(p.records)

	totalPage := int(math.Ceil(float64(count) / float64(limit)))

	return &models.PagingResult{
		Page:      page,
		Limit:     limit,
		TotalPage: totalPage,
		Count:     int(count),
	}

}
