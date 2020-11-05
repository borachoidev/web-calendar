package cal.oracle.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import oracle.db.OracleConnect;

public class CalendarDao {
	OracleConnect db;
	public CalendarDao() {
		// TODO Auto-generated constructor stub
		db=OracleConnect.getInstance();
	}

	//출력
	public List<CalendarDto> sortColor(String color){
		List<CalendarDto> list= new ArrayList<CalendarDto>();
		Connection conn=null;
		PreparedStatement pstmt =null;
		String sql="select * from calendar where colors=?";
		ResultSet rs=null;

		conn=db.getConnection();

		try
		{
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1,color);
			rs=pstmt.executeQuery();

			while (rs.next())
			{
				CalendarDto dto= new CalendarDto();
				dto.setNum(rs.getString("num"));
				dto.setColors(rs.getString("colors"));
				dto.setDates(rs.getString("dates"));
				dto.setTitle(rs.getString("title"));
				dto.setMemo(rs.getString("memo"));

				list.add(dto);	
			}

		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(rs, pstmt, conn);
		}
		return list;
	}
	
	public List<CalendarDto> printData(){
		List<CalendarDto> list= new ArrayList<CalendarDto>();
		Connection conn=null;
		PreparedStatement pstmt =null;
		String sql="select * from calendar order by dates asc";
		ResultSet rs=null;

		conn=db.getConnection();

		try
		{
			pstmt=conn.prepareStatement(sql);
			rs=pstmt.executeQuery();

			while (rs.next())
			{
				CalendarDto dto= new CalendarDto();
				dto.setNum(rs.getString("num"));
				dto.setColors(rs.getString("colors"));
				dto.setDates(rs.getString("dates"));
				dto.setTitle(rs.getString("title"));
				dto.setMemo(rs.getString("memo"));

				list.add(dto);	
			}

		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(rs, pstmt, conn);
		}
		return list;
	}
	//추가
	public void addData(CalendarDto dto) {
		Connection conn=null;
		PreparedStatement pstmt = null;
		String sql = "insert into calendar values(cal.nextval,?,?,?,?)";
		conn=db.getConnection();

		try
		{
			pstmt=conn.prepareStatement(sql);

			pstmt.setString(1,dto.getTitle());
			pstmt.setString(2,dto.getDates());
			pstmt.setString(3,dto.getMemo());
			pstmt.setString(4,dto.getColors());

			pstmt.execute();
		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(pstmt, conn);
		}



	}


	//수정전읽기

	public CalendarDto readData(String num) {
		CalendarDto dto= new CalendarDto();
		Connection conn=null;
		PreparedStatement pstmt =null;
		String sql="select * from calendar where num=?";
		ResultSet rs=null;
		conn=db.getConnection();

		try
		{
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1,num);
			rs=pstmt.executeQuery();

			while(rs.next()) {
				dto.setNum(rs.getString("num"));
				dto.setTitle(rs.getString("title"));
				dto.setMemo(rs.getString("memo"));
				dto.setDates(rs.getString("dates"));
				dto.setColors(rs.getString("colors"));

			}
		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(rs,pstmt, conn);
		}
		return dto;
	}

	//수정
	public void updateData(CalendarDto dto) {
		Connection conn=null;
		PreparedStatement pstmt =null;
		String sql="update calendar set title=?, dates=?, memo=?, colors=? where num=?";

		conn=db.getConnection();
		try
		{
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, dto.getTitle());
			pstmt.setString(2, dto.getDates());
			pstmt.setString(3, dto.getMemo());
			pstmt.setString(4, dto.getColors());
			pstmt.setString(5, dto.getNum());

			pstmt.execute();
		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(pstmt, conn);
		}

	}

	//삭제
	public void deleteData(String num) {
		Connection conn= null;
		PreparedStatement pstmt =null;
		String sql = "delete from calendar where num=?";
		conn=db.getConnection();
		try
		{
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, num);
			pstmt.execute();

		} catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			db.dbClose(pstmt, conn);
		}

	}

}
