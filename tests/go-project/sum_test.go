package sample_test

import (
	"testing"

	sample "example.com/ci-go-fixture"
)

func TestSum(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name        string
		left, right int
		want        int
	}{
		{"positive", 2, 3, 5},
		{"negative", -2, 1, -1},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			if got := sample.Sum(test.left, test.right); got != test.want {
				t.Errorf("Sum(%d, %d) = %d; want %d", test.left, test.right, got, test.want)
			}
		})
	}
}
