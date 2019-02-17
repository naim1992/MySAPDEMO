package jsonFile;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Team {

	
	private JSONObject root;
	private JSONArray team;
	private JSONObject tm;
	private Map<String, String> map;
	
	public Team()
	{
		 root = new JSONObject();
		 team = new JSONArray();
		 map = new HashMap<String, String>();

	}
	
	public void insert(String id_team,String name)
	{
		this.map.put("id_team", id_team);
		this.map.put("name_team", name);
	}
	
	
	@SuppressWarnings("unchecked")
	public void add()
	{ 
		tm = new JSONObject();
		tm.putAll(map);
		
		team.add(tm);	
		this.map = new HashMap<String, String>();
	}
	
	
	
	
	@SuppressWarnings("unchecked")
	public String filt()
	{
		
		root.put("team", team);
		return root.toJSONString();
	}
	
	/**
	public static void main(String[] args)
	{
		
		Team emp = new Team();
		
			
		emp.insert("3","Cloud");
		emp.add();
		
		
		
		
		emp.insert("4","ABAP");
		emp.add();
		
		System.out.println(	emp.filt());
		
		
		
	
		
	}
	
	*/
}
