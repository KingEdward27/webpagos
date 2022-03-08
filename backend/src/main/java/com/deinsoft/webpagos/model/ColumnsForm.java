package com.deinsoft.webpagos.model;

public class ColumnsForm {
	private String tableName;
	private String columnName;
	private String inputType;
	private String relatedBy;
	private Load load;
	private Object value;
	
	public ColumnsForm() {
		super();
	}
	public ColumnsForm(String columnName, String inputType) {
		super();
		this.columnName = columnName;
		this.inputType = inputType;
	}
	
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getInputType() {
		return inputType;
	}
	public void setInputType(String inputType) {
		this.inputType = inputType;
	}
	public String getRelatedBy() {
		return relatedBy;
	}
	public void setRelatedBy(String relatedBy) {
		this.relatedBy = relatedBy;
	}
	public Load getLoad() {
		return load;
	}
	public void setLoad(Load load) {
		this.load = load;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	
	
}
