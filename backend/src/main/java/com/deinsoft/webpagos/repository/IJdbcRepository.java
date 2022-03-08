package com.deinsoft.webpagos.repository;

import java.util.List;
import java.util.Map;

import com.deinsoft.webpagos.model.MetaData;


public interface IJdbcRepository {
	List<MetaData> findAll(String tableName);
}
