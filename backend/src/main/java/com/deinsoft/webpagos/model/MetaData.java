package com.deinsoft.webpagos.model;

public class MetaData {
	private String columName;
	private String dataType;
	private String dataTypeJava;
	private String columnTypeHTML;
	private int length;
	private int decimalsLength;
	private boolean nullable;
	private String constraintName;
	private String constraintType;
	private String foreignKeyTable;
	private String foreignKeyColumn;
	private int countForeigned;
	
	
	public MetaData() {
		super();
	}
	public MetaData(String columName, String dataType, String dataTypeJava, int length, int decimalsLength,
			Boolean isNullable, String constraintName, String constraintType, String foreignKeyTable,
			String foreignKeyColumn, int countForeigned,String columnTypeHTML) {
		super();
		this.columName = columName;
		this.dataType = dataType;
		this.dataTypeJava = dataTypeJava;
		this.length = length;
		this.decimalsLength = decimalsLength;
		this.nullable = isNullable;
		this.constraintName = constraintName;
		this.constraintType = constraintType;
		this.foreignKeyTable = foreignKeyTable;
		this.foreignKeyColumn = foreignKeyColumn;
		this.countForeigned = countForeigned;
		this.columnTypeHTML = columnTypeHTML;
	}


	public String getColumName() {
		return columName;
	}
	public void setColumName(String columName) {
		this.columName = columName;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public String getDataTypeJava() {
		return dataTypeJava;
	}
	public void setDataTypeJava(String dataTypeJava) {
		this.dataTypeJava = dataTypeJava;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public int getDecimalsLength() {
		return decimalsLength;
	}
	public void setDecimalsLength(int decimalsLength) {
		this.decimalsLength = decimalsLength;
	}
	
	public String getConstraintName() {
		return constraintName;
	}
	public void setConstraintName(String constraintName) {
		this.constraintName = constraintName;
	}
	public String getConstraintType() {
		return constraintType;
	}
	public void setConstraintType(String constraintType) {
		this.constraintType = constraintType;
	}
	public String getForeignKeyTable() {
		return foreignKeyTable;
	}
	public void setForeignKeyTable(String foreignKeyTable) {
		this.foreignKeyTable = foreignKeyTable;
	}
	public String getForeignKeyColumn() {
		return foreignKeyColumn;
	}
	public void setForeignKeyColumn(String foreignKeyColumn) {
		this.foreignKeyColumn = foreignKeyColumn;
	}
	
	
	public int getCountForeigned() {
		return countForeigned;
	}


	public void setCountForeigned(int countForeigned) {
		this.countForeigned = countForeigned;
	}


	public boolean isNullable() {
		return nullable;
	}
	public void setNullable(boolean nullable) {
		this.nullable = nullable;
	}
	public String getColumnTypeHTML() {
		return columnTypeHTML;
	}
	public void setColumnTypeHTML(String columnTypeHTML) {
		this.columnTypeHTML = columnTypeHTML;
	}
	
	@Override
	public String toString() {
		return "MetaData [columName=" + columName + ", dataType=" + dataType + ", dataTypeJava=" + dataTypeJava
				+ ", length=" + length + ", decimalsLength=" + decimalsLength + ", nullable=" + nullable
				+ ", constraintName=" + constraintName + ", constraintType=" + constraintType + ", foreignKeyTable="
				+ foreignKeyTable + ", foreignKeyColumn=" + foreignKeyColumn + ", countForeigned=" + countForeigned
				+ "]";
	}
	
}
