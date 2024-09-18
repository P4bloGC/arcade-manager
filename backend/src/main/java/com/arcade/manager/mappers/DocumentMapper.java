package com.arcade.manager.mappers;

import com.arcade.manager.models.Document;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DocumentMapper {

    List<Document> getAllDocument();

    Document getDocumentById(Integer id);

    List<Document> getDocumentByType(Integer idSystem, String type);

    void insertDocument(Document document);

    void updateDocument(Document document);

    void deleteDocument(Integer id);
}
