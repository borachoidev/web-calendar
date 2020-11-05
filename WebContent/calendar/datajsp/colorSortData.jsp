<?xml version="1.0" encoding="UTF-8"?>
<%@page import="java.util.List"%>
<%@page import="cal.oracle.db.CalendarDao"%>
<%@page import="cal.oracle.db.CalendarDto"%>
<%@ page language="java" contentType="text/xml; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String colors=request.getParameter("colors");
CalendarDao dao=new CalendarDao();

List<CalendarDto> list =dao.sortColor(colors);

%>
<list>
<% 
for (CalendarDto dto: list){
%>

<cal num="<%=dto.getNum()%>">
	<title><%=dto.getTitle()%></title>
	<colors><%=dto.getColors()%></colors>
	<dates><%=dto.getDates()%></dates>
	<memo><%=dto.getMemo()%></memo>
</cal>


<% }%>
</list>