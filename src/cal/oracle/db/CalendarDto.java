package cal.oracle.db;

public class CalendarDto {
private String num;
private String title;
private String dates;
private String memo;
private String colors;
public String getColors()
{
	return colors;
}
public void setColors(String colors)
{
	this.colors = colors;
}
public String getNum()
{
	return num;
}
public void setNum(String num)
{
	this.num = num;
}
public String getTitle()
{
	return title;
}
public void setTitle(String title)
{
	this.title = title;
}
public String getDates()
{
	return dates;
}
public void setDates(String dates)
{
	this.dates = dates;
}
public String getMemo()
{
	return memo;
}
public void setMemo(String memo)
{
	this.memo = memo;
}

}
