package jsonFile;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Employees {
	
	private JSONObject root;
	private JSONArray emp;
	private JSONObject employee, map;

	
	public Employees()
	{
		 root = new JSONObject();
		 emp = new JSONArray();


	}
	
	
	@SuppressWarnings("unchecked")
	public void insert(String name, String date, String am, String pm)
	{
		int i = 0;
		boolean find = false;
		map = new JSONObject();
	
		
		while(i < emp.size() && find == false)
		{
			JSONObject obj = (JSONObject) emp.get(i);
			
			if(obj.containsValue(name))
			{
				JSONArray arr = new JSONArray();

				arr.add(am);
				arr.add(pm);
				obj.put(date, arr);
				find = true;
			}
			else
				i++;
		}
		
		if(find == false)
		{
			
			this.map.put("name", name);
			
			JSONArray arr = new JSONArray();

			arr.add(am);
			arr.add(pm);
			
			this.map.put(date, arr);
			this.add();
		}
	
	}
	
	
	@SuppressWarnings("unchecked")
	public void insertDayWorked(String name, String worked)
	{
		int i = 0;
		boolean find = false;
		map = new JSONObject();
	
		
		while(i < emp.size() && find == false)
		{
			JSONObject obj = (JSONObject) emp.get(i);
			
			if(obj.containsValue(name))
			{
				obj.put("nbr_day_worked", worked);
				find = true;
			}
			else
				i++;
		}
		
		if(find == false)
		{
			
			this.map.put("name", name);

			this.map.put("nbr_day_worked", worked);
			this.add();
		}

		
	}
	
	
	@SuppressWarnings("unchecked")
	public void add()
	{ 
		this.employee = new JSONObject();
		this.employee.putAll(map);
		
		emp.add(this.employee);	

	}
	

	
	
	@SuppressWarnings("unchecked")
	public String filt()
	{
		
		root.put("employee", emp);
		return root.toJSONString();
	}
	

/**
	public static void main(String[] args)
	{
		
		Employees emp = new Employees();
		
			
		emp.insert("Naim","10.12.2015","F","H");
		
		emp.insert("Naim","20.12.2015", "N","H");
		emp.insert("Naim","21.12.2015", "N","H");
		emp.insert("Naim","22.12.2015", "N","H");
		
	
		
		emp.insert("Naim","23.12.2015", "N","H");
		emp.insert("Naim","24.12.2015", "N","H");
		 
	
		
		emp.insert("moi","20.12.2015", "N","N");
	
		
		emp.insert("moi","21.12.2015", "N","H");
		
		emp.insert("Naim","22.12.2015", "N","H");
	
		
		emp.insertDayWorked("Naim", "22");
		
		emp.insertDayWorked("moi", "22");

		System.out.println(	emp.filt());
		
		
		
	
		
	}
	
*/
	}

