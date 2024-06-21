package parse

func ParseToUint[T any](v any) {

}

// func assertion[T any](v any, exist bool) (T, error) {
// 	if exist {
// 		if got, ok := v.(T); ok {
// 			return got, nil
// 		} else {
// 			return got, fmt.Errorf("can not convert type: %T to %T ", v, *new(T))
// 		}
// 	}
// 	return *new(T), errors.New("not exist")
// }
