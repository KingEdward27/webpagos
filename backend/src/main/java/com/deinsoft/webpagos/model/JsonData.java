package com.deinsoft.webpagos.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JsonData {
	String tableName;
	String title;
	
	List<ForeignTables> foreignTables;
	List<ChildTables> childTables;
	List<ColumnsForm> columnsForm;
	List<ColumnsList> columnsList;
	Map<String, Object> filters;
	int typeDeleteVoid;
	boolean generateFrontend;
	boolean regenerate;
	String columnState;
	
	String columnsListWithOutProp;
	long id;
	List<String> orders;
	//get data from database
//	String dataType;
//	int length;
//	boolean nullable;
	
	boolean validNullableColumnsFromDatabase;
	
	public JsonData() {
		super();
	}
	public JsonData(String title, List<ForeignTables> foreignTables, List<ColumnsForm> columnsForm,
			List<ColumnsList> columnsList, int typeDeleteVoid, String columnState,
			boolean validNullableColumnsFromDatabase) {
		super();
		this.title = title;
		this.foreignTables = foreignTables;
		this.columnsForm = columnsForm;
		this.columnsList = columnsList;
		this.typeDeleteVoid = typeDeleteVoid;
		this.columnState = columnState;
		this.validNullableColumnsFromDatabase = validNullableColumnsFromDatabase;
	}
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<ForeignTables> getForeignTables() {
		return foreignTables;
	}
	public void setForeignTables(List<ForeignTables> foreignTables) {
		this.foreignTables = foreignTables;
	}
	public List<ColumnsForm> getColumnsForm() {
		return columnsForm;
	}
	public void setColumnsForm(List<ColumnsForm> columnsForm) {
		this.columnsForm = columnsForm;
	}
	public List<ColumnsList> getColumnsList() {
		return columnsList;
	}
	public void setColumnsList(List<ColumnsList> columnsList) {
		this.columnsList = columnsList;
	}
	public int getTypeDeleteVoid() {
		return typeDeleteVoid;
	}
	public void setTypeDeleteVoid(int typeDeleteVoid) {
		this.typeDeleteVoid = typeDeleteVoid;
	}
	public boolean generateFrontend() {
		return generateFrontend;
	}
	public void setGenerateFrontend(boolean generateFrontend) {
		this.generateFrontend = generateFrontend;
	}
	public String getColumnState() {
		return columnState;
	}
	public void setColumnState(String columnState) {
		this.columnState = columnState;
	}
	public boolean isValidNullableColumnsFromDatabase() {
		return validNullableColumnsFromDatabase;
	}
	public void setValidNullableColumnsFromDatabase(boolean validNullableColumnsFromDatabase) {
		this.validNullableColumnsFromDatabase = validNullableColumnsFromDatabase;
	}
	
	public List<ChildTables> getChildTables() {
		return childTables;
	}
	public void setChildTables(List<ChildTables> childTables) {
		this.childTables = childTables;
	}
	
	
	public boolean isRegenerate() {
		return regenerate;
	}
	public void setRegenerate(boolean regenerate) {
		this.regenerate = regenerate;
	}
	
	public Map<String, Object> getFilters() {
		return filters;
	}
	public void setFilters(Map<String, Object> filters) {
		this.filters = filters;
	}
	@Override
	public String toString() {
		return "JsonData [title=" + title + ", foreignTables=" + foreignTables + ", columnsForm=" + columnsForm
				+ ", columnsList=" + columnsList + ", typeDeleteVoid=" + typeDeleteVoid + ", columnState=" + columnState
				+ ", validNullableColumnsFromDatabase=" + validNullableColumnsFromDatabase + "]";
	}
	public String getColumnsListWithOutProp() {
		return columnsListWithOutProp;
	}
	public void setColumnsListWithOutProp(String columnsListWithOutProp) {
		this.columnsListWithOutProp = columnsListWithOutProp;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public List<String> getOrders() {
		return orders;
	}
	public void setOrders(List<String> orders) {
		this.orders = orders;
	}
	
}
