	package jsonFile;

	import java.util.HashMap;
	import java.util.Map;

	import org.json.simple.JSONArray;
	import org.json.simple.JSONObject;


public class Request {

	
	

		private JSONObject root;
		private JSONArray requette;
		private JSONObject req;
		private Map<String, String> map;
		
		public Request()
		{
			 root = new JSONObject();
			 requette = new JSONArray();
			 map = new HashMap<String, String>();

		}
		
		public void insert(String bname,String begin_date, String end_date, String status_request, String raison)
		{
			this.map.put("bname", bname);
			this.map.put("begin_date", begin_date);
			this.map.put("end_date", end_date);
			this.map.put("status_request", status_request);
			this.map.put("raison_request", raison);
		}
		
		public void insert_manager(String bname,String begin_date, String end_date, String status_request, String observation)
		{
			this.map.put("bname", bname);
			this.map.put("begin_date", begin_date);
			this.map.put("end_date", end_date);
			this.map.put("status_request", status_request);
			this.map.put("observation", observation);
		}
		
		@SuppressWarnings("unchecked")
		public void add()
		{ 
			req = new JSONObject();
			req.putAll(map);
			 
			requette.add(req);	
			this.map = new HashMap<String, String>();
		}
		
		
		
		
		@SuppressWarnings("unchecked")
		public String filt()
		{
			
			root.put("request", requette);
			return root.toJSONString();
		}
		
	/**
		public static void main(String[] args)
		{
			
			Request emp = new Request();
			
				
			emp.insert("choullna","17-07-2015","17-07-2015", "W");
			emp.add();
			
			
			
			
			emp.insert("Harracam","17-07-2015","17-07-2015", "W");
			emp.add();
			
			System.out.println(	emp.filt());
			
			
			
		
			
		}
		
		*/
	
		
	}

