<%@page import="org.json.simple.JSONObject"%>
<%@page import="cal.oracle.db.CalendarDto"%>
<%@page import="cal.oracle.db.CalendarDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String num=request.getParameter("num");

CalendarDao dao = new CalendarDao();
CalendarDto dto = dao.readData(num);

JSONObject ob = new JSONObject();

ob.put("num",dto.getNum());
ob.put("title",dto.getTitle());
ob.put("dates", dto.getDates());
ob.put("memo", dto.getMemo());
ob.put("colors", dto.getColors());


%>

<%=ob.toString()%>