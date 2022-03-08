package com.deinsoft.webpagos.model;

import java.util.List;

public class ForeignTables {
	String tableName;
	String idValue;
	String descriptionColumn;
	List<String> keys;
	
	public ForeignTables() {
		super();
	}
	public ForeignTables(String tableName, String idValue, String descriptionColumn) {
		super();
		this.tableName = tableName;
		this.idValue = idValue;
		this.descriptionColumn = descriptionColumn;
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
	public String getDescriptionColumn() {
		return descriptionColumn;
	}
	public void setDescriptionColumn(String descriptionColumn) {
		this.descriptionColumn = descriptionColumn;
	}
	public List<String> getKeys() {
		return keys;
	}
	public void setKeys(List<String> keys) {
		this.keys = keys;
	}
	
}
