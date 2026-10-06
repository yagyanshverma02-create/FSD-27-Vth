import java.util.*;
class Studen{
    String name;
    int rollno;
    String dep;

    Studen(String name,int rollno,String dep){
        this.name=name;
        
        this.rollno=rollno;
        this.dep=dep;
    }

    }
    public class main{
        public static void main(String[] args) {
            ArrayList<Studen> list=new ArrayList<>();
            list.add(new Studen(name: ARUN, 1, dep:CSE));
            list.add(new Studen(RAJ, 2,ECE));
            list.add(new Studen(ROHIT, 10, CSE));
            list.add(new Studen(ROHAN, 23, AIML));
            list.add(new Studen(OM, 39, DS));
            
            for(String s:studen){
                System.out.println(s.name +" " +s.rollno+" " +s.dep+" ");
            }



        }
    }