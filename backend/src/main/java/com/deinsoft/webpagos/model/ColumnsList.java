package com.deinsoft.webpagos.model;

public class ColumnsList {
	private String tableName;
	private String columnName;
	private String filterType;
	
	
	public ColumnsList() {
		super();
	}
	public ColumnsList(String columnName, String filterType) {
		super();
		this.columnName = columnName;
		this.filterType = filterType;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getFilterType() {
		return filterType;
	}
	public void setFilterType(String filterType) {
		this.filterType = filterType;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
}
