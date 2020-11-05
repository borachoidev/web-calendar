<%@page import="cal.oracle.db.CalendarDao"%>
<%@page import="cal.oracle.db.CalendarDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String colors=request.getParameter("colors");
String title=request.getParameter("title");
String dates=request.getParameter("dates");
String memo=request.getParameter("memo");

CalendarDto dto = new CalendarDto();

dto.setColors(colors);
dto.setDates(dates);
dto.setMemo(memo);
dto.setTitle(title);

CalendarDao dao=new CalendarDao();

dao.addData(dto);
%>