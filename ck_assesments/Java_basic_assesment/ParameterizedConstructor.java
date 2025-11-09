class Books {
    String title;
    String author;
    int price;

    public Books(String title ,String author ,int price) {
        this.title = title;
        this.author = author;
        this.price = price;

        System.out.println("title: "+title + ", author: "+author + ", price: "+price);
    }

    
}

class ParameterizedConstructor {

    public static void main(String[] args) {
        
        Books books = new Books("Harry potter" ,"james bond", 1000);
    }

}
