class BankAccountClass{

    int accountNumber;
    String holderName;
    int balance;

    public BankAccountClass(int accountNumber, String holderName ,int balance) {
        
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance  = balance;

        System.out.println("accountNumber: " + accountNumber + " holderName: " + holderName + " balance: " + balance);
    
    }

    
}

class BankAccount {
    
    public static void main(String[] args) {

        BankAccountClass BAC = new BankAccountClass(4578954, "saddam", 1000);

    }
}
