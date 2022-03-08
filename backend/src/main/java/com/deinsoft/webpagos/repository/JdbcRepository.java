package com.deinsoft.webpagos.repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.poi.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.deinsoft.webpagos.model.*;

@Repository
public class JdbcRepository implements IJdbcRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private static final Logger logger = LoggerFactory.getLogger(JdbcRepository.class);

	
	@Override
	
	/**
	 * @param tableName
	 * @return get metadata from table name
	 */
	public List<MetaData> findAll(String tableName) {
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		mapSqlParameterSource.addValue("tableName", tableName);
		return namedParameterJdbcTemplate.query("SELECT c.column_name,data_type,\r\n"
				+ "					case when (data_type = 'numeric' or c.data_type = 'bigint' or c.data_type = 'integer') and (c.numeric_scale = 0 or c.numeric_scale is null) then 'long'\r\n"
				+ "						 when (data_type = 'numeric' or c.data_type = 'bigint' ) and c.numeric_scale > 0 then 'BigDecimal'\r\n"
				+ "					when c.data_type = 'character varying' or c.data_type = 'text' or c.data_type = 'character' then 'String'\r\n"
				+ "					when c.data_type = 'date' or strpos(c.data_type,'timestamp') > 0 then 'Date' else c.data_type end tipoJava,\r\n"
				+ "					case when c.data_type = 'numeric' or c.data_type = 'integer'  then numeric_precision_radix\r\n"
				+ "					when c.data_type = 'bigint' then numeric_precision + numeric_precision_radix + 1\r\n"
				+ "					else c.character_maximum_length end tamanio,\r\n"
				+ "					c.numeric_scale decimals,\r\n" + "					c.is_nullable,\r\n"
				+ "					wa.constraint_name, \r\n" + "					wa.foreign_table_name,\r\n"
				+ "					wa.foreign_column_name,\r\n" + "					c.numeric_scale,\r\n"
				+ "					coalesce (wa.constraint_type,'') constraint_type,\r\n"
				+ "					(select count(*)\r\n" + "						    from  \r\n"
				+ "						    information_schema.table_constraints AS tc  \r\n"
				+ "						    JOIN information_schema.key_column_usage AS kcu \r\n"
				+ "						      ON tc.constraint_name = kcu.constraint_name \r\n"
				+ "						      AND tc.table_schema = kcu.table_schema \r\n"
				+ "						    JOIN information_schema.constraint_column_usage AS ccu \r\n"
				+ "						      ON ccu.constraint_name = tc.constraint_name \r\n"
				+ "						      AND ccu.table_schema = tc.table_schema \r\n"
				+ "						where tc.constraint_type = 'FOREIGN KEY' \r\n"
				+ "						and ccu.table_name= c.table_name and ccu.column_name = c.column_name\r\n"
				+ "						) count_foreigned\r\n"
				+ "					FROM information_schema.columns c\r\n" + "					 left join  \r\n"
				+ "					    (select tc.table_schema,  \r\n"
				+ "						    tc.constraint_name,  \r\n"
				+ "						    tc.table_name,  \r\n" + "						    kcu.column_name,  \r\n"
				+ "						    ccu.table_schema AS foreign_table_schema, \r\n"
				+ "						    ccu.table_name AS foreign_table_name, \r\n"
				+ "						    ccu.column_name AS foreign_column_name,\r\n"
				+ "						    tc.constraint_type\r\n" + "						    from  \r\n"
				+ "						    information_schema.table_constraints AS tc  \r\n"
				+ "						    JOIN information_schema.key_column_usage AS kcu \r\n"
				+ "						      ON tc.constraint_name = kcu.constraint_name \r\n"
				+ "						      AND tc.table_schema = kcu.table_schema \r\n"
				+ "						    JOIN information_schema.constraint_column_usage AS ccu \r\n"
				+ "						      ON ccu.constraint_name = tc.constraint_name \r\n"
				+ "						      AND ccu.table_schema = tc.table_schema \r\n"
				+ "						) wa\r\n"
				+ "						on (wa.table_name= c.table_name and wa.column_name = c.column_name)\r\n"
				+ "						where c.table_name = :tableName", mapSqlParameterSource,
				(rs, rowNum) -> new MetaData(rs.getString("column_name"), rs.getString("data_type"),
						rs.getString("tipoJava"), rs.getInt("tamanio"), rs.getInt("decimals"),
						rs.getString("is_nullable").equals("NO") ? false : true, rs.getString("constraint_name"),
						rs.getString("constraint_type"), rs.getString("foreign_table_name"),
						rs.getString("foreign_column_name"), rs.getInt("count_foreigned"),
						rs.getString("data_type").equals("numeric") ? "number"
								: rs.getString("data_type").equals("character varying") ? "text" : "text"));
	}
	public long getIdValueFromSequence(String tableName) throws Exception {
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		mapSqlParameterSource.addValue("tableName", tableName);
		String sql = "select coalesce(max(seq.relname),'') relname from pg_class seq\r\n" + 
				"JOIN pg_depend d ON d.objid = seq.oid AND d.deptype = 'a' \r\n" + 
				"  JOIN pg_class tab ON d.objid = seq.oid AND d.refobjid = tab.oid\r\n" + 
				" where seq.relkind = 'S' \r\n" + 
				" and tab.relname = :tableName";
		String seqName = namedParameterJdbcTemplate.queryForObject(sql, mapSqlParameterSource,
				(rs, rowNum) -> rs.getString("relname")).toString();
		if(seqName.isEmpty()) {
			seqName = "CREATE SEQUENCE public.seq_"+tableName+"_id\r\n"
					+ "	INCREMENT BY 1\r\n"
					+ "	MINVALUE 1\r\n"
					+ "	MAXVALUE 9223372036854775807\r\n"
					+ "	START 1\r\n"
					+ "	CACHE 1\r\n"
					+ "	NO CYCLE;\r\n"
					+ "ALTER SEQUENCE seq_"+tableName+"_id OWNED BY "+tableName+"."+tableName+"_id;";
			int wa = jdbcTemplate.update(seqName);
			if(wa != 0) {
				throw new Exception("No se pudo crear la sequencia");
			}
		}
		seqName = namedParameterJdbcTemplate.queryForObject(sql, mapSqlParameterSource,
				(rs, rowNum) -> rs.getString("relname")).toString();
		mapSqlParameterSource = new MapSqlParameterSource().addValue("seqName", seqName);
		return Long.parseLong((namedParameterJdbcTemplate.queryForObject("SELECT nextval(:seqName) val", mapSqlParameterSource,
						(rs, rowNum) -> rs.getString("val"))).toString());
	}
	private String getColumnPk(String tableName) {
		List<MetaData> listMetaData = findAll(tableName);
		String columnPk = "";
		for (MetaData metaData : listMetaData) {
			if (metaData.getConstraintType().equals("PRIMARY KEY")) {
				columnPk = metaData.getColumName();
			}
		}
		return columnPk;
	}

	public List<ForeignTables> getListForeignKeys(String tableName) {
		List<MetaData> listMetaData = findAll(tableName);
		List<ForeignTables> listFks = new ArrayList<ForeignTables>();
		for (MetaData metaData2 : listMetaData) {
			if (metaData2.getConstraintType().equals("FOREIGN KEY")) {
				listFks.add(new ForeignTables(metaData2.getForeignKeyTable(), metaData2.getForeignKeyColumn(), ""));
			}
		}
		return listFks;
	}
	/**
	 * 
	 * @param tableName
	 * @param descriptionColumns
	 * @return select by descriptionColumns
	 */
	public List<Object[]> getListForCombos(String tableName, String descriptionColumns) {
		String sql = "select distinct ";

		String columnPk = getColumnPk(tableName);
		sql = sql.concat(columnPk).concat(",").concat(descriptionColumns).concat(",").concat("'").concat(tableName)
				.concat("'");
		sql = sql.concat(" from ");
		sql = sql.concat(tableName);
		logger.info(sql);
		List<Object[]> list = jdbcTemplate.queryForList(sql).stream().map(row -> row.values().toArray())
				.collect(Collectors.toList());
		return list;
	}
	/**
	 * 
	 * @param jsonData
	 * @return map with columns from table
	 */
	public Map<String, Object> selectData(JsonData jsonData) {
		String sql = "select ";
		Map<String, Object> objectResult = null;
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();

		String columnPk = getColumnPk(jsonData.getTableName());
		sql = sql.concat(jsonData.getTableName()).concat(".").concat(columnPk).concat(" as ")
				.concat(jsonData.getTableName()).concat("__").concat(columnPk).concat(",");

		List<ColumnsForm> listColumns = jsonData.getColumnsForm();
		int tamanio = listColumns.size();

		for (ColumnsForm columnsForm : listColumns) {
			sql = sql.concat(columnsForm.getTableName()).concat(".").concat(columnsForm.getColumnName()).concat(" as ")
					.concat(columnsForm.getTableName()).concat("__").concat(columnsForm.getColumnName()).concat(",");
//			if(columnsForm.getTableName().equals(jsonData.getTableName()) || columnsForm.getRelatedBy() != null) {
//				sql = sql.concat(columnsForm.getTableName()).concat(".").concat(columnsForm.getColumnName()).concat(" as ").
//						concat(columnsForm.getTableName()).concat("_").concat(columnsForm.getColumnName()).concat(",");
//			}
			if (columnsForm.getLoad() != null) {
				sql = sql.concat(columnsForm.getTableName()).concat(".").concat(columnsForm.getLoad().getLoadBy())
						.concat(" as ").concat(columnsForm.getTableName()).concat("__")
						.concat(columnsForm.getLoad().getLoadBy()).concat(",");
			}
			if (columnsForm.getRelatedBy() != null) {
				sql = sql.concat(columnsForm.getTableName()).concat(".").concat(columnsForm.getRelatedBy())
						.concat(" as ").concat(columnsForm.getTableName()).concat("__")
						.concat(columnsForm.getRelatedBy()).concat(",");
			}
		}

		sql = sql.substring(0, sql.length() - 1);
		sql = sql.concat(" from ");
		sql = sql.concat(jsonData.getTableName());

		if (jsonData.getForeignTables() != null && !jsonData.getForeignTables().isEmpty()) {
			for (ForeignTables foreignTable : jsonData.getForeignTables()) {
				sql = sql.concat(" left join ").concat(foreignTable.getTableName()).concat(" on ")
						.concat(foreignTable.getTableName()).concat(".").concat(foreignTable.getIdValue()).concat(" = ")
						.concat(jsonData.getTableName()).concat(".").concat(foreignTable.getIdValue());

			}
			for (ForeignTables foreignTable : jsonData.getForeignTables()) {
				ForeignTables foreignTables = new ForeignTables(foreignTable.getTableName(), foreignTable.getIdValue(),
						"");
				while (foreignTables != null) {
					List<ForeignTables> listFks = getListForeignKeys(foreignTables.getTableName());
					foreignTables = null;
					for (ForeignTables fkTable : listFks) {
						for (ColumnsForm columnsForm : listColumns) {
							if (columnsForm.getLoad() != null
									&& fkTable.getTableName().equals(columnsForm.getTableName())) {
								foreignTables = new ForeignTables(fkTable.getTableName(), fkTable.getIdValue(), "");
								// get data for select
								sql = sql.concat(" left join ").concat(columnsForm.getTableName()).concat(" on ")
										.concat(columnsForm.getLoad().getTableName()).concat(".")
										.concat(columnsForm.getLoad().getLoadBy()).concat(" = ")
										.concat(foreignTables.getTableName()).concat(".")
										.concat(foreignTables.getIdValue());
								break;
							}
						}
					}
				}
			}
		}

		sql = sql.concat(" where ");
		sql = sql.concat("").concat(columnPk).concat(" = :").concat(columnPk);
		mapSqlParameterSource.addValue(columnPk, jsonData.getId());

		logger.info(sql);

		List<Map<String, Object>> list = namedParameterJdbcTemplate.queryForList(sql, mapSqlParameterSource);
		if (list.size() > 0) {
			objectResult = list.get(0);
		}
		return objectResult;
	}

	public List<Object[]> getListForCombosWithFilters(JsonData jsonData) {
		String sql = "select ";
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		String columnPk = getColumnPk(jsonData.getTableName());
		sql = sql.concat(columnPk).concat(",").concat(jsonData.getColumnsListWithOutProp()).concat(",").concat("'")
				.concat(jsonData.getTableName()).concat("'");
		sql = sql.concat(" from ");
		sql = sql.concat(jsonData.getTableName());
		if (!jsonData.getFilters().isEmpty()) {
			sql = sql.concat(" where ");
			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				mapSqlParameterSource.addValue(key, Long.parseLong(String.valueOf(value)));

				sql = sql.concat("").concat(key).concat(" = :").concat(key).concat(" and ");
			}
			sql = sql.substring(0, sql.length() - 5);
		}
		logger.info(sql);
		List<Object[]> list = namedParameterJdbcTemplate.queryForList(sql, mapSqlParameterSource).stream()
				.map(row -> row.values().toArray()).collect(Collectors.toList());
		;
		return list;
	}

	public List<Object[]> selectColumns(JsonData jsonData) {
		String sql = "select ";

		String columnPk = getColumnPk(jsonData.getTableName());
		sql = sql.concat(jsonData.getTableName()).concat(".").concat(columnPk).concat(",");

		List<ColumnsList> listColumns = jsonData.getColumnsList();
		int tamanio = listColumns.size();
		for (ColumnsList columnsList : listColumns) {
			sql = sql.concat(columnsList.getTableName()).concat(".").concat(columnsList.getColumnName()).concat(" as ")
					.concat(columnsList.getTableName()).concat("_").concat(columnsList.getColumnName()).concat(",");
		}
		sql = sql.substring(0, sql.length() - 1);
		sql = sql.concat(" from ");
		sql = sql.concat(jsonData.getTableName());
		if (jsonData.getForeignTables() != null && !jsonData.getForeignTables().isEmpty()) {
			for (ForeignTables foreignTable : jsonData.getForeignTables()) {
				sql = sql.concat(" inner join ").concat(foreignTable.getTableName()).concat(" on ")
						.concat(foreignTable.getTableName()).concat(".").concat(foreignTable.getIdValue()).concat(" = ")
						.concat(jsonData.getTableName()).concat(".").concat(foreignTable.getIdValue());
			}
		}
		logger.info(sql);
		List<Object[]> list = jdbcTemplate.queryForList(sql).stream().map(row -> row.values().toArray())
				.collect(Collectors.toList());
		return list;
	}

	public List<Object[]> selectColumnsWithFilters(JsonData jsonData) {
		String sql = "select ";

		String columnPk = getColumnPk(jsonData.getTableName());
		sql = sql.concat(jsonData.getTableName()).concat(".").concat(columnPk).concat(",");

		List<ColumnsList> listColumns = jsonData.getColumnsList();
		for (ColumnsList columnsList : listColumns) {
			sql = sql.concat(columnsList.getTableName()).concat(".").concat(columnsList.getColumnName()).concat(" as ")
					.concat(columnsList.getTableName()).concat("_").concat(columnsList.getColumnName()).concat(",");
		}
		sql = sql.substring(0, sql.length() - 1);
		sql = sql.concat(" from ");
		sql = sql.concat(jsonData.getTableName());

		if (jsonData.getForeignTables() != null && !jsonData.getForeignTables().isEmpty()) {
			for (ForeignTables foreignTable : jsonData.getForeignTables()) {
				sql = sql.concat(" inner join ").concat(foreignTable.getTableName()).concat(" on ")
						.concat(foreignTable.getTableName()).concat(".").concat(foreignTable.getIdValue()).concat(" = ")
						.concat(jsonData.getTableName()).concat(".").concat(foreignTable.getIdValue());
			}
		}

		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		if (jsonData.getFilters() != null && !jsonData.getFilters().isEmpty()) {
			sql = sql.concat(" where ");
			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				mapSqlParameterSource.addValue(key, "%" + value + "%");

				sql = sql.concat("upper(").concat(key).concat(")").concat(" like upper(:").concat(key).concat(") and ");
			}
			sql = sql.substring(0, sql.length() - 5);
		}
		logger.info(sql);
		List<Object[]> list = namedParameterJdbcTemplate.queryForList(sql, mapSqlParameterSource).stream()
				.map(row -> row.values().toArray()).collect(Collectors.toList());
		return list;
	}
	private boolean isEmpty(Object column,Boolean fk) {
		if(column == null) {
			return true;
		}
		if(String.valueOf(column).contentEquals("")) {
			return true;
		}
		if(fk && String.valueOf(column).equals("0")) {
			return true;
		}
		return false;
	}
	public Object validate(JsonData jsonData) {
		Map<String, Object> errores = new HashMap<>();
		List<MetaData> listMetaData = findAll(jsonData.getTableName());
//		for (MetaData metaData : listMetaData) {
//			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
//				if(entry.getKey().equalsIgnoreCase(metaData.getColumName()) &&
//						!metaData.isNullable() &&  this.isEmpty(entry.getValue(),metaData.getConstraintType().equals("FOREIGN KEY"))) {
//					errores.put(metaData.getColumName(), " El campo " + metaData.getColumName() + " " + " tiene un valor incorrecto");
//				}
//			}
			for (ColumnsForm columnsForm : jsonData.getColumnsForm()) {
				for (MetaData metaData : listMetaData) {
					if(columnsForm.getTableName().equalsIgnoreCase(jsonData.getTableName()) 
							&& columnsForm.getColumnName().equalsIgnoreCase(metaData.getColumName()) 
							|| (!columnsForm.getTableName().equalsIgnoreCase(jsonData.getTableName()) 
							&& (columnsForm.getRelatedBy() != null && columnsForm.getRelatedBy().equalsIgnoreCase(metaData.getColumName())))) {
						if(!metaData.isNullable() 
								&&  this.isEmpty(columnsForm.getValue(),(metaData.getConstraintType().equals("FOREIGN KEY") || !columnsForm.getTableName().equalsIgnoreCase(jsonData.getTableName())))) {
							errores.put(metaData.getColumName(), " El campo " + metaData.getColumName() + " " + " tiene un valor incorrecto");
							break;
						}
					}
					
				}
				
			}
			
//		}
		if(!errores.isEmpty()) {
			return errores;
		}
		return null;
	}
	public Object create(JsonData jsonData) throws Exception {
		
		
		String sql = "insert into ";
		sql = sql.concat(jsonData.getTableName()).concat("(");
		String columnPk = "";
		List<MetaData> listMetaData = findAll(jsonData.getTableName());
		for (MetaData metaData : listMetaData) {
			if (metaData.getConstraintType().equals("PRIMARY KEY")) {
				columnPk = metaData.getColumName();
			}
		}
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		
		if (!jsonData.getFilters().isEmpty()) {
			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
				String key = entry.getKey();
				if(key.equals("id")) {
					sql = sql.concat("").concat(columnPk).concat(",");
				}else {
					sql = sql.concat("").concat(key).concat(",");
				}
				
			}
			sql = sql.substring(0, sql.length() - 1);
			sql = sql.concat(" )");
			sql = sql.concat(" values (");
			long seqVal = getIdValueFromSequence(jsonData.getTableName());
			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
				
				
				String key = entry.getKey();
				Object value = entry.getValue();
				if(key.equals("id")) {
					sql = sql.concat(" :").concat(columnPk).concat(",");
					mapSqlParameterSource.addValue(columnPk, seqVal);
				}else {
					sql = sql.concat(" :").concat(key).concat(",");
					parseDataType(listMetaData, mapSqlParameterSource, key, value);
					
				}
				
			}
			sql = sql.substring(0, sql.length() - 1);
			sql = sql.concat(" )");
		}
		logger.info(sql);
		int wa = namedParameterJdbcTemplate.update(sql, mapSqlParameterSource);
		return wa;
	}
	private void parseDataType(List<MetaData> listMetaData, MapSqlParameterSource mapSqlParameterSource, String key,
			Object value) throws ParseException {
		String tipoDato = "";
		for (MetaData item : listMetaData) {
			if(item.getColumName().equals(key)) {
				tipoDato = item.getDataTypeJava();
				break;
			}
		}
		switch (tipoDato) {
		case "String":
			mapSqlParameterSource.addValue(key, String.valueOf(value));
			break;
		case "long":
			mapSqlParameterSource.addValue(key, Long.parseLong(String.valueOf(value)));
			break;
		case "BigDecimal":
			mapSqlParameterSource.addValue(key, new BigDecimal(String.valueOf(value)));
			break;
		case "Date":
			if(String.valueOf(value).equalsIgnoreCase("")) {
				mapSqlParameterSource.addValue(key, null);
			}else {
				Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(String.valueOf(value));
				java.sql.Date dateSql = new java.sql.Date(date1.getTime());
				mapSqlParameterSource.addValue(key, dateSql);
			}
			break;
		default:
			mapSqlParameterSource.addValue(key, value);
			break;
		}
	}
	public Object update(JsonData jsonData) throws ParseException {
		String sql = "update ";
		sql = sql.concat(jsonData.getTableName()).concat(" set ");
		List<MetaData> listMetaData = findAll(jsonData.getTableName());
		String columnPk = "";
		for (MetaData metaData : listMetaData) {
			if (metaData.getConstraintType().equals("PRIMARY KEY")) {
				columnPk = metaData.getColumName();
			}
		}
		
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
		
		if (!jsonData.getFilters().isEmpty()) {
			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				if(!key.equals("id")) {
					sql = sql.concat(key).concat(" = :").concat(key).concat(",");
					parseDataType(listMetaData, mapSqlParameterSource, key, value);
				}
				
			}
			sql = sql.substring(0, sql.length() - 1);
			sql = sql.concat(" where ").concat(columnPk).concat(" = :").concat(columnPk);
			mapSqlParameterSource.addValue(columnPk, jsonData.getId());
			
		}
		logger.info(sql);
		return namedParameterJdbcTemplate.update(sql, mapSqlParameterSource);
	}
	public Object delete(String tableName, long id) throws ParseException {
		String sql = "delete from ";
		sql = sql.concat(tableName).concat(" ");
		List<MetaData> listMetaData = findAll(tableName);
		String columnPk = "";
		for (MetaData metaData : listMetaData) {
			if (metaData.getConstraintType().equals("PRIMARY KEY")) {
				columnPk = metaData.getColumName();
			}
		}
//		
		MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
//		
//		if (!jsonData.getFilters().isEmpty()) {
//			for (Map.Entry<String, Object> entry : jsonData.getFilters().entrySet()) {
//				String key = entry.getKey();
//				Object value = entry.getValue();
//				if(!key.equals("id")) {
//					sql = sql.concat(key).concat(" = :").concat(key).concat(",");
//					parseDataType(listMetaData, mapSqlParameterSource, key, value);
//				}
//				
//			}
//			sql = sql.substring(0, sql.length() - 1);
			sql = sql.concat(" where ").concat(columnPk).concat(" = :").concat(columnPk);
			mapSqlParameterSource.addValue(columnPk, id);
			
//		}
		logger.info(sql);
		return namedParameterJdbcTemplate.update(sql, mapSqlParameterSource);
	}
}
