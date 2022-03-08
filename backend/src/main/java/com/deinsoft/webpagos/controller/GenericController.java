package com.deinsoft.webpagos.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.deinsoft.webpagos.model.JsonData;
import com.deinsoft.webpagos.repository.JdbcRepository;


@RestController
public class GenericController {
	private static final Logger logger = LoggerFactory.getLogger(GenericController.class);
	
	@Autowired
	JdbcRepository jdbcRepository;
	
	@PostMapping(value="/select-by-properties")
	public ResponseEntity<?> selectByProperties(@RequestBody JsonData jsonData,  HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("selectByTablename received: "+jsonData.toString());
		logger.info("listColumns received: "+jsonData.getColumnsList());
		logger.info("foreigns received: "+jsonData.getForeignTables());
		List<Object[]> selectedColumns = jdbcRepository.selectColumns(jsonData);
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		return ResponseEntity.status(HttpStatus.CREATED).body(selectedColumns);
	}
	@PostMapping(value="/select-by-tablename-with-filters")
	public ResponseEntity<?> selectByTablenameWithFilters(@RequestBody JsonData jsonData, HttpServletRequest request) {
		logger.info("selectByTablenameWithFilters received: "+jsonData.toString());
		List<Object[]> selectedColumns = jdbcRepository.selectColumnsWithFilters(jsonData);
		return ResponseEntity.status(HttpStatus.CREATED).body(selectedColumns);
	}
	@GetMapping(value="/select-combos-by-tablename")
	public ResponseEntity<?> selectByTablename(String tableName,String descriptionColumns,  HttpServletRequest request) {
		logger.info("selectByTablename received: "+tableName);
		List<Object[]> selectedColumns = jdbcRepository.getListForCombos(tableName,descriptionColumns);
		return ResponseEntity.status(HttpStatus.CREATED).body(selectedColumns);
	}
	@PostMapping(value="/select-combos-by-properties")
	public ResponseEntity<?> selectByProperties2(@RequestBody JsonData jsonData,  HttpServletRequest request) {
		logger.info("selectByProperties2 received: "+jsonData.toString());
		List<Object[]> selectedColumns = jdbcRepository.getListForCombosWithFilters(jsonData);
		return ResponseEntity.status(HttpStatus.CREATED).body(selectedColumns);
	}
	@PostMapping(value="/select-by-id")
	public ResponseEntity<?> selectById(@RequestBody JsonData jsonData,  HttpServletRequest request) {
		logger.info("selectById received: "+jsonData.toString());
		Map<String,Object> object = jdbcRepository.selectData(jsonData);
		return ResponseEntity.status(HttpStatus.CREATED).body(object);
	}
	@PostMapping(value="/save")
	public ResponseEntity<?> create(@RequestBody JsonData jsonData, HttpServletRequest request) throws Exception {
		logger.info("selectByTablename received: "+jsonData.toString());
		logger.info("listColumns received: "+jsonData.getFilters());
		logger.info("getFilters received: "+jsonData.getFilters().entrySet());
		Object object = jdbcRepository.validate(jsonData);
		
		if(object != null) {
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(object);
		}
		if(jsonData.getId() == 0) {
			object = jdbcRepository.create(jsonData);
		}else {
			object = jdbcRepository.update(jsonData);;
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(object);
	}
	@DeleteMapping(value="/delete")
	public ResponseEntity<?> delete(@Param("tableName") String tableName,@Param("id") Long id, HttpServletRequest request) throws Exception {
		
		Object object = jdbcRepository.delete(tableName,id);
		return ResponseEntity.status(HttpStatus.CREATED).body(object);
	}
}
