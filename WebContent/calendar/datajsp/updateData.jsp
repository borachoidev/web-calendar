<%@page import="cal.oracle.db.CalendarDao"%>
<%@page import="cal.oracle.db.CalendarDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
CalendarDto dto=new CalendarDto();

String num=request.getParameter("num");
String title=request.getParameter("title");
String dates=request.getParameter("dates");
String memo=request.getParameter("memo");
String colors=request.getParameter("colors");

dto.setColors(colors);
dto.setDates(dates);
dto.setMemo(memo);
dto.setTitle(title);
dto.setNum(num);

CalendarDao dao=new CalendarDao();

dao.updateData(dto);
%>