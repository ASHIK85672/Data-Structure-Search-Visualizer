#include <stdio.h>

void sortArray(int arr[], int n) {
    int i, j, temp;

    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n, target, left, right, mid, i, step = 1;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];

    printf("Enter %d elements:\n", n);
    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    sortArray(arr, n);

    printf("\nSorted array: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    printf("\nEnter element to search: ");
    scanf("%d", &target);

    left = 0;
    right = n - 1;

    printf("\n--- Binary Search Steps ---\n");

    while (left <= right) {
        mid = left + (right - left) / 2;

        printf("\nStep %d\n", step++);
        printf("Left = %d, Right = %d, Mid = %d\n", left, right, mid);
        printf("Comparing arr[%d] = %d with target %d\n",
               mid, arr[mid], target);

        if (arr[mid] == target) {
            printf("\nElement %d found at index %d.\n", target, mid);
            return 0;
        } else if (arr[mid] < target) {
            printf("%d is smaller than %d. Search the right half.\n",
                   arr[mid], target);
            left = mid + 1;
        } else {
            printf("%d is greater than %d. Search the left half.\n",
                   arr[mid], target);
            right = mid - 1;
        }
    }

    printf("\nElement %d not found in the array.\n", target);

    return 0;
}
