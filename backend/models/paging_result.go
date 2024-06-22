package models
type PagingResult struct {
	Page int `json:"page"`
	Limit int `json:"limit"`
	TotalPage int `json:"TotalPage"`
	Count int `json:"count"`
}