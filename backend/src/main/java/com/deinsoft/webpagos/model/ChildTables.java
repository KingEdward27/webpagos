package com.deinsoft.webpagos.model;

import java.util.List;

public class ChildTables {
	String tableName;
	String tableNameDetail;
	String idValue;
	List<ColumnsForm> columnsForm;
	
	public ChildTables() {
		super();
	}
	public ChildTables(String tableName, String idValue, String descriptionColumn) {
		super();
		this.tableName = tableName;
		this.idValue = idValue;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getIdValue() {
		return idValue;
	}
	public void setIdValue(String idValue) {
		this.idValue = idValue;
	}
	public String getTableNameDetail() {
		return tableNameDetail;
	}
	public void setTableNameDetail(String tableNameDetail) {
		this.tableNameDetail = tableNameDetail;
	}
	public List<ColumnsForm> getColumnsForm() {
		return columnsForm;
	}
	public void setColumnsForm(List<ColumnsForm> columnsForm) {
		this.columnsForm = columnsForm;
	}
	
}
