package oracle.db;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class OracleConnect {
	//다른 클래스에서는 new로 생성할 수 없다
	private OracleConnect() {
		//오라클 드라이버클래스 호출	
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			System.out.println("오라클 드라이버 클래스 성공");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("오라클 드라이버가 없어요:"+e.getMessage());
		}
	}
	public static OracleConnect getInstance()
	{
		return new OracleConnect();
	}
	//db연결해서 성공한 커넥션 반환하는 메서드
	public Connection getConnection(){

		Connection conn=null;
		String url="jdbc:oracle:thin:@localhost:1521:xe";
		try {
			conn=DriverManager.getConnection(url,"angel","a1234");
		} catch (SQLException e) {
			System.out.println("오라클 서버 연결 실패:"+e.getMessage());
		}

		return conn; 
	}
	//총 4개의 dbClose를 만듦
	public void dbClose(ResultSet rs,Statement stmt,Connection conn)
	{
		try {
			if(rs!=null) rs.close();
			if(stmt!=null) stmt.close();
			if(conn!=null) conn.close();
		}catch(SQLException e) {}
	}
	public void dbClose(Statement stmt,Connection conn)
	{
		try {
			if(stmt!=null) stmt.close();
			if(conn!=null) conn.close();
		}catch(SQLException e) {}
	}
	public void dbClose(ResultSet rs,PreparedStatement pstmt,Connection conn)
	{
		try {
			if(rs!=null) rs.close();
			if(pstmt!=null) pstmt.close();
			if(conn!=null) conn.close();
		}catch(SQLException e) {}
	}
	public void dbClose(PreparedStatement pstmt,Connection conn)
	{
		try {
			if(pstmt!=null) pstmt.close();
			if(conn!=null) conn.close();
		}catch(SQLException e) {}
	}

}
