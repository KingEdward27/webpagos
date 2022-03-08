package com.deinsoft.webpagos.model;

public class Load {
	private String tableName;
	private String loadBy;
	
	
	public Load() {
		super();
	}
	
	
	public Load(String tableName, String loadBy) {
		super();
		this.tableName = tableName;
		this.loadBy = loadBy;
	}


	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getLoadBy() {
		return loadBy;
	}
	public void setLoadBy(String loadBy) {
		this.loadBy = loadBy;
	}
	
	
}
