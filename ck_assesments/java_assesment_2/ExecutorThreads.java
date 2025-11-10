import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

class ExecutorThreads {

    public static void main(String[] args) {

        ExecutorService executor = Executors.newFixedThreadPool(2);
        AtomicInteger count = new AtomicInteger(0);

        for (int i = 1; i <= 10; i++) {
            int localcopy = i;

            executor.submit(() -> {
                System.out.println(localcopy * 2 + " -> " + Thread.currentThread().getName());

            });
        }

        // for (int i = 1; i <= 10; i++) {
        // int localcopy = i;

        // executor.submit(() -> {
        // if (Thread.currentThread().getName().equals("pool-1-thread-2") && count.get()
        // == 0) {
        // count.incrementAndGet();
        // try {
        // Thread.sleep(100);
        // } catch (Exception ex) {
        // ex.printStackTrace();
        // }
        // }

        // System.out.println(localcopy * 2 + " -> " +
        // Thread.currentThread().getName());
        // try {
        // Thread.sleep(100);
        // } catch (Exception ex) {
        // ex.printStackTrace();
        // }
        // });
        // }

        executor.shutdown();
    }
}
