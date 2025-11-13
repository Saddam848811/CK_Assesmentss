// class SharedResources {
//     private Integer data = null;

//     synchronized void producer(Integer number) throws InterruptedException {
//         System.out.println("Producer enter");
        
//         while (data != null) { 
//             wait();
//         }

//         data = number;
//         System.out.println("Produced: " + data);

//         notifyAll(); // 
//         System.out.println("Producer exit");
//     }

//     synchronized void consumer() throws InterruptedException {
//         System.out.println("Consumer enter");

//         while (data == null) { 
//             wait();
//         }

//         System.out.println("Consumed: " + data);
//         data = null;

//         notifyAll(); 
//         System.out.println("Consumer exit");
//     }
// }

// class ProducerConsumer {
//     public static void main(String[] args) {
//         SharedResources sr = new SharedResources();

//         Thread producerThread = new Thread(() -> {
//             try {
//                 for (int i = 0; i < 5; i++) {
//                     sr.producer(i);
//                     Thread.sleep(500);
//                 }
//             } catch (InterruptedException ex) {
//                 Thread.currentThread().interrupt();
//             }
//         });

//         Thread consumerThread = new Thread(() -> {
//             try {
//                 for (int i = 0; i < 5; i++) {
//                     sr.consumer();
//                     Thread.sleep(1000);
//                 }
//             } catch (InterruptedException ex) {
//                 Thread.currentThread().interrupt();
//             }
//         });

//         producerThread.start();
//         consumerThread.start();
//     }
// }






import java.util.LinkedList;
import java.util.Queue;

class SharedBuffer {
    private final Queue<Integer> buffer = new LinkedList<>();
    private final int CAPACITY = 5;

    // Producer method
    public synchronized void produce(int number) throws InterruptedException {
        while (buffer.size() == CAPACITY) {
            System.out.println("Buffer full. Producer waiting...");
            wait(); // wait until consumer consumes
        }

        buffer.add(number);
        System.out.println("Produced: " + number);

        notifyAll(); // wake up waiting consumers
    }

    // Consumer method
    public synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {
            System.out.println("Buffer empty. Consumer waiting...");
            wait(); // wait until producer produces
        }

        int value = buffer.poll();
        System.out.println("Consumed: " + value);

        notifyAll(); // wake up waiting producers
        return value;
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        SharedBuffer shared = new SharedBuffer();

        // Producer thread
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 50; i++) {
                    shared.produce(i);
                    Thread.sleep(100); // simulate time to produce
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // Consumer thread
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 50; i++) {
                    shared.consume();
                    Thread.sleep(200); // simulate time to consume
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
