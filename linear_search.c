#include <stdio.h>

int main() {
    int n, target, i, found = -1;

    printf("Enter number of elements: ");
    scanf("%d", &n);

    int arr[n];

    printf("Enter %d elements:\n", n);
    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Enter element to search: ");
    scanf("%d", &target);

    printf("\n--- Linear Search Steps ---\n");

    for (i = 0; i < n; i++) {
        printf("Step %d: Comparing arr[%d] = %d with target %d\n",
               i + 1, i, arr[i], target);

        if (arr[i] == target) {
            found = i;
            break;
        }
    }

    if (found != -1)
        printf("\nElement %d found at index %d.\n", target, found);
    else
        printf("\nElement %d not found in the array.\n", target);

    return 0;
}
