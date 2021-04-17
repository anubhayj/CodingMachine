package main

import (
	"fmt"
	"os"
	"strconv"
)

func print_fizz_buzz(n int) []interface{} {
	c3 := 0
	c2 := 0
	var array = make([]interface{}, 0)
	fmt.Println(array)
	for i := 1; i <= n; i++ {
		c3++
		c2++
		msg := ""
		if c3 == 3 {
			msg = "FIZZ"
			c3 = 0
		}
		if c2 == 2 {
			msg = msg + "BUZZ"
			c2 = 0
		}
		if msg == "" {
			array = append(array, i)
		} else {
			array = append(array, msg)
		}
	}
	return array
}

func main() {

	arg := os.Args[1:]
	n, _ := strconv.Atoi(arg[0]) // Yeah! not taking care of error.

	arr := print_fizz_buzz(n)
	fmt.Println(arr)

}
