class Thread1 extends Thread {

    @Override
    public void run() {
        for (int i = 1; i < 10; i++) {
            System.out.println("thread1");
            System.out.println(i*4);

            try {

                Thread.sleep(500);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

}

class Thread2 extends Thread {

    @Override
    public void run() {
        for (int i = 1; i < 10; i++) {
            System.out.println("thread2");
            System.out.println(i*2);
            try {

                Thread.sleep(500);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}

class ThreadsForTable {

    public static void main(String[] args) {

        Thread1 t1 = new Thread1();
        t1.start();

        Thread2 t2 = new Thread2();
        t2.start();
    }

}
