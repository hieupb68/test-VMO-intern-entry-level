package cau5;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ManagerInt {

    public void sumK(int[] m, int n) {
        List<List<Integer>> result = new ArrayList<>();
        findSubarrays(m, 0, n, new ArrayList<>(), result);

        // In ra các mảng con đã tìm được
        for (List<Integer> subarray : result) {
            System.out.println(subarray);
        }
    }

    private void findSubarrays(int[] m, int start, int target, List<Integer> current, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < m.length; i++) {
            if (target - m[i] >= 0) {
                current.add(m[i]);
                findSubarrays(m, i + 1, target - m[i], current, result);
                current.remove(current.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        ManagerInt manager = new ManagerInt();

        // Sử dụng Scanner để nhập mảng từ người dùng
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhập số lượng phần tử của mảng: ");
        int length = scanner.nextInt();
        int[] m = new int[length];

        System.out.println("Nhập các phần tử của mảng:");
        for (int i = 0; i < length; i++) {
            m[i] = scanner.nextInt();
        }

        System.out.print("Nhập số n: ");
        int n = scanner.nextInt();

        scanner.close();

        // Gọi phương thức sumK để tính toán và in ra kết quả
        manager.sumK(m, n);
    }
}
