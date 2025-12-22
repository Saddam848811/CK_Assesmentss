const RDSdata = [
  {
    resourceId: "i-0a1b2c3d4e5f6g1",
    resourceName: "EC2-Web-Server-1",
    engine: "EC2",
    region: "us-east-1",
    status: "Running",
  },
  {
    resourceId: "i-0a1b2c3d4e5f6g2",
    resourceName: "EC2-App-Server",
    engine: "EC2",
    region: "us-west-2",
    status: "Stopped",
  },
  {
    resourceId: "db-ABC123XYZ",
    resourceName: "RDS-User-DB",
    engine: "RDS",
    region: "eu-west-1",
    status: "Available",
  },
  {
    resourceId: "i-0a1b2c3d4e5f6g3",
    resourceName: "EC2-Batch-Job",
    engine: "EC2",
    region: "ap-south-1",
    status: "Stopped",
  },
  {
    resourceId: "db-XYZ789LMN",
    resourceName: "RDS-Orders",
    engine: "RDS",
    region: "us-east-2",
    status: "Available",
  },
  {
    resourceId: "asg-frontend-01",
    resourceName: "ASG-Frontend",
    engine: "AutoScaling",
    region: "us-west-1",
    status: "Active",
  },
  {
    resourceId: "i-0a1b2c3d4e5f6g4",
    resourceName: "EC2-Test-Server",
    engine: "EC2",
    region: "ca-central-1",
    status: "Running",
  },
  {
    resourceId: "asg-backend-02",
    resourceName: "ASG-Backend",
    engine: "AutoScaling",
    region: "eu-central-1",
    status: "Active",
  },
  {
    resourceId: "db-TEST456",
    resourceName: "RDS-Test-DB",
    engine: "RDS",
    region: "ap-northeast-1",
    status: "Stopped",
  },
  {
    resourceId: "i-0a1b2c3d4e5f6g5",
    resourceName: "EC2-Analytics",
    engine: "EC2",
    region: "us-east-1",
    status: "Running",
  },
];

export default RDSdata;
