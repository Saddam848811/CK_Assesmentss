
class InvalidAmountException extends Exception {

    InvalidAmountException(String message) {

        super(message);
    }

}

class OverdraftException extends Exception {
    OverdraftException(String message) {
        super(message);

    }

}

class BankAccount {

    static  int numberOfAccounts = 0;
    private int balance = 0;

    public BankAccount() {
        numberOfAccounts = numberOfAccounts+1;
    }

    

    void deposit(int deposit) throws InvalidAmountException {

        if (deposit != (int)deposit || deposit <= 0) {
            throw new InvalidAmountException("enter valid ammount");
        } else {
            System.out.println(deposit + " deposited to your account");

            balance = balance + deposit;
        }

    }

    int withdraw(int withdraw) throws OverdraftException {
        if (withdraw <= balance) {

            System.out.println(withdraw + " recieved");

            return balance = balance - withdraw;
        }
        throw new OverdraftException("insufficient balance");

    }

    int getBalance() {

        return this.balance;

    }
}

class MiniBankingApplication {

    public static void main(String[] args) {

        BankAccount user = new BankAccount();
        BankAccount user2 = new BankAccount();
        try {

            user.deposit(-1000);
            System.out.println(user.withdraw(100) + " left");
            System.out.println(user.getBalance() + " current balance");

            user2.deposit(2000);
            System.out.println(user2.withdraw(500) + " left");
            System.out.println(user2.getBalance() + " current balnce");

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(BankAccount.numberOfAccounts+" Accounts in your Bank");
    }

}
