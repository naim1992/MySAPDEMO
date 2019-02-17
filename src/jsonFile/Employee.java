package jsonFile;




import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Employee {
	
	private JSONObject root;
	private JSONArray emp;
	private JSONObject employee;
	private Map<String, String> map;
	
	public Employee()
	{
		 root = new JSONObject();
		 emp = new JSONArray();
		 map = new HashMap<String, String>();

	}
	
	public void insert(String name)
	{
		this.map.put("name", name);
	}
	
	
	@SuppressWarnings("unchecked")
	public void add()
	{ 
		employee = new JSONObject();
		employee.putAll(map);
		
		emp.add(employee);	
		this.map = new HashMap<String, String>();
	}
	
	public void insertDays(String date, String typedate)
	{

		this.map.put(date, typedate);
		
	}
	
	
	
	@SuppressWarnings("unchecked")
	public String filt()
	{
		
		root.put("employee", emp);
		return root.toJSONString();
	}
	
	
	
	/*
	public static void main(String[] args)
	{
		
		Employees emp = new Employees();
		
			
		emp.insert("Naim");
		emp.insertDays("10.12.2015","F");
		emp.insertDays("20.12.2015", "N");
		
		emp.add();
		
		
		
		emp.insertDays("11.12.2015","F");
		emp.insert("blabla");
		emp.add();
		
		System.out.println(	emp.filt());
		
		
		
	
		
	}
*/
}

